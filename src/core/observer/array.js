/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * @desc Intercept mutating methods and emit events
 * 魔改拦截了原生的数据方法
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method] // 存留数组原生方法
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args) // 调用原生方法
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted) // observe 添加的值，删除的就不管了
    // notify change
    ob.dep.notify()
    return result // 返回值
  })
})

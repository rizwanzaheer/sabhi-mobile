import { ClaimTreeNormalised } from '../types'
import { isPast } from 'date-fns'
const S = require('sugar/string')

/**
 * Check val;idity of a claim
 */
export const checkValidity = (exp: number, revoked: boolean) => {
  const invalid = revoked || isPast(exp)

  return {
    valid: invalid ? false : true,
    status: invalid ? (revoked ? 'Revoked' : 'Expired') : 'Valid',
  }
}

/**
 * Returns true if the item being passed in is the only key ina claim and it's the top level = 0
 */
export const isTopLevelSingleKey = (claimObject: any, level: number): boolean => {
  return Object.keys(claimObject).length === 1 && level === 0
}

export const normaliseClaimTree = (
  claimObject: any,
  level: number = 0,
  isListItem = false,
): ClaimTreeNormalised[] => {
  const claimKeysArray = Object.keys(claimObject)

  return claimKeysArray.map((k: string, i: number) => {
    /**
     * Simple flags to check data types for children
     */
    const valueisObject = typeof claimObject[k] === 'object'
    const valueisArray = Array.isArray(claimObject[k])

    /**
     * parse keyname as human readable. Note S
     */
    const parsedKeyName = S.String.titleize(k)

    return {
      level,
      key: level.toString() + i.toString() + k.toLowerCase(),
      keyName: k,
      title: parsedKeyName,
      hasChildren: valueisObject || valueisArray,
      isList: valueisArray,
      isListItem: !valueisObject && !valueisArray && isListItem,
      value:
        valueisObject || valueisArray
          ? normaliseClaimTree(claimObject[k], level + 1, valueisArray)
          : claimObject[k],
    }
  })
}

export const renderCrendentialItem = (contentItem: any) => {
  const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
  if (typeof contentItem === 'boolean') {
    return contentItem ? 'Yes' : 'No'
  } else if (typeof contentItem === 'number') {
    return contentItem
  } else if (typeof contentItem === 'string' && imageUrlPattern.test(contentItem)) {
    /**
     * Return null if we think it's an image url
     */
    return null
  } else if (typeof contentItem === 'string' && contentItem.startsWith('https://')) {
    return contentItem
  } else if (typeof contentItem === 'string') {
    return contentItem
  }
  /**
   * Return false if nothing is found
   */
  return false
}

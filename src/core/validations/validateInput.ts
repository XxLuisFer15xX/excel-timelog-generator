import { TypeValidation } from '@types'
import { typeRegex } from './regex'

const {
  regexOnlyNumber,
  regexOnlyLetters,
  regexOnlyLettersExtend,
  regexAlphanumeric,
  regexAlphanumericExtend,
  regexValidateEmail,
  regexValidateEmailDomain,
} = typeRegex

export const validTextInput = (
  value: string,
  type: TypeValidation | undefined,
): boolean => {
  switch (type) {
    case 'onlyNumber':
      return regexOnlyNumber.test(value)
    case 'onlyLetters':
      return regexOnlyLetters.test(value)
    case 'onlyLettersExtend':
      return regexOnlyLettersExtend.test(value)
    case 'onlyAlphanumeric':
      return regexAlphanumeric.test(value)
    case 'onlyAlphanumericExtend':
      return regexAlphanumericExtend.test(value)
    default:
      return true
  }
}

export const validInputEmail = (
  value: string,
  type: TypeValidation | undefined,
): boolean => {
  switch (type) {
    case 'validateEmail':
      return regexValidateEmail.test(value)
    case 'validateEmailDomain':
      return regexValidateEmailDomain.test(value)
    default:
      return true
  }
}

export const validInputInitialNumbers = (
  value: string,
  initialNumbers: number[],
) => {
  let isValid: boolean = true
  isValid = regexOnlyNumber.test(value)
  if (isValid) {
    let isValidNumber: boolean = false
    initialNumbers.forEach(number => {
      if (number === parseFloat(value.charAt(0))) isValidNumber = true
    })
    isValid = isValidNumber
  }
  return isValid
}

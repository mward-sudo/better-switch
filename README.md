[![RelativeCI](https://badges.relative-ci.com/badges/AIKtaLiweEEbVOTnUg01?branch=main)](https://app.relative-ci.com/projects/AIKtaLiweEEbVOTnUg01)

# @scripthungry/better-switch
A simple alternative to the switch statement for matching strings and returning values

## To install and use

    npm i @scripthungry/better-switch

In your code:

    import betterSwitch from '@scripthungry/better-switch'

## Examples
### Javascript:

Simple example:

    const returnVal = betterSwitch('test', {
      test: () => 'test value', 
      default: () => 'default value' 
    }) // returnVal === 'test value'

Non-existent key returns default key value:

    const returnVal2 = betterSwitch('non existent key', { 
      test: () => 'test value', 
      default: () => true 
    }) // returnVal2 === true

Error due to non existent key and no default key:

    const returnVal3 = betterSwitch('non existent key', { 
      test: () => 'test value', 
      test2: 'test2 value' 
    })

### Typescript:

Enforcing a consistent return type using type inference from the first return value:

    const returnVal = betterSwitch('test', { 
      test: () => 'test value', 
      default: () => 'default value' 
    }) // returnVal === 'test value'

Enforcing a specified consistent return type:

    const returnVal = betterSwitch<string>('test', { 
      test: () => 'test value', 
      default: () => 'default value' 
    }) // returnVal === 'test value'

Typescript error because the default key does not return the same type as the first key:

    const returnVal = betterSwitch('test', { 
      test: () => 'test value', 
      default: () => true 
    })

Allowing unknown return types:

    const returnVal = betterSwitch<unknown>('non existent key', {
      test: () => 'test value', 
      default: () => true 
    }) // returnVal === true

Allowing multiple specified return types

    const returnVal = betterSwitch<string | boolean>('non existent key', { 
      test: () => 'test value', 
      default: () => true 
    }) // returnVal === true
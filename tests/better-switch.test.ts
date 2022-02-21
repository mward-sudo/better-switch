import betterSwitch from '../index'

test('should return \'test\'', () => {
  const result = betterSwitch('test', {
    test: () => 'test',
    default: () => 'default',
  })
  expect(result).toBe('test')
})

test('should return \'default\'', () => {
  const result = betterSwitch('none existent key', {
    test: () => 'test',
    default: () => 'default',
  })
  expect(result).toBe('default')
})

test('should return false' , () => {
  const result = betterSwitch('test', {
    test: () => false,
    default: () => true,
  })
  expect(result).toBe(false)
})

test('should return true' , () => {
  const result = betterSwitch<string | boolean>('none existent key', {
    test: () => 'test',
    default: () => true,
  })
  expect(result).toBe(true)
})

test('should throw an error' , () => {
  expect(() => {
    const result = betterSwitch('none existent key', {
      test: () => 'test',
    })
  }).toThrowError()
})


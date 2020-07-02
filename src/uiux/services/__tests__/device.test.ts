import Device from '../device'

describe('Service: Device', () => {
  it('should return correct default jest platform for IOS', () => {
    /**
     * Jest sets the default platform to IOS
     */
    expect(Device.isIOS).toBeTruthy()
    expect(Device.isAndroid).toBeFalsy()
  })

  it('should return correct values for width and height', () => {
    /**
     * Jest sets the default width and height
     */
    expect(Device.width).toBe(750)
    expect(Device.height).toBe(1334)
  })
})

const tooltipMaps = {
  email: new Map([
    ['focus', 'example: tester@test.com'],
    ['blur', 'invalid value']
  ]),
  password: new Map([
    ['focus', '6 min, 1 up, 1 low, 1 number, 1 spec'],
    ['blur', 'invalid value']
  ]),
  confirmedPassword: new Map([
    ['focus', 'passwords must match'],
    ['blur', 'passwords must match']
  ])
}

export default tooltipMaps;

const REQUEST_TYPE = {
  text: 'TEXT',
  menu: 'MENU',
  url: 'URL',
  call: 'CALL',
  ussd: 'USSD'
}

const CAMPAIGN_STATUS = {
  NEW: '0',
  TEST: '1',
  ACTIVE: '2',
  PAUSE: '3',
  CANCEL: '4',
  DELETE: '5',
  COMPLETED: '6'
}

export {
  REQUEST_TYPE,
  CAMPAIGN_STATUS
}
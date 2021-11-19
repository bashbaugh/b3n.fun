const headlines: Array<{
  summary: string
  title: string
  quote: string
  url: string
  date: string
}> = [
  {
    url: 'https://www.bbc.com/news/business-50132400',
    date: '2019',
    summary: 'Misleading investors',
    title: 'Exxon accused of misleading investors on climate change',
    quote:
      'internal documents show Exxon evaluated new projects based on forecasts for costs associated with climate change that were lower than those it told investors it was using',
  },
  {
    url: 'https://www.reuters.com/business/energy/exxon-chevron-not-disclosing-payments-some-governments-transparency-group-2021-09-22/',
    date: '2021',
    summary: 'Lacking transparency',
    title: 'Exxon, Chevron conceal payments to some governments',
    quote:
      'Exxon and Chevron have declined to publicly disclose taxes and other payments they have made to governments in the countries where they operate that are not EITI members',
  },
  {
    url: 'https://www.mass.gov/news/ag-healey-sues-exxon-for-deceiving-massachusetts-consumers-and-investors',
    date: '2019',
    summary: 'Withholding information',
    title:
      'AG Healey Sues Exxon for Deceiving Massachusetts Consumers and Investors',
    quote:
      'Exxon systematically and intentionally has misled Massachusetts investors about material climate-driven risks to its business and has deceived consumers about the central role its fossil fuel products play in causing climate change.',
  },
]

export default headlines

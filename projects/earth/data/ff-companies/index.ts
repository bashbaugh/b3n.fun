import adnoc from './adnoc.png'
import bhpb from './bhpbilliton.png'
import bp from './bp.png'
import chevron from './chevron.jpeg'
import coalIndia from './coal_india.svg'
import conoco from './conocophillips.png'
import exxon from './exxonmobil.png'
import gazprom from './gazprom.png'
import kuwait from './kuwait-petroleum-corp.png'
import iranian from './national-iranian-oil-co.png'
import pdvsa from './pdvsa.png'
import pemex from './pemex.png'
import petrobras from './petrobras.png'
import petrocn from './petrochina.png'
import saudi from './saudi-aramco.png'
import sonatrach from './sonatrach.png'
import total from './total.png'
import shell from './shell.png'
import peabody from './peabody.svg'
import consol from './consolenergy.png'

// https://climateaccountability.org/carbonmajors_dataset2020.html
export const source = {
  title:
    'CO2 & CH4 emissions, selected companies, ranked by cumulative emissions (compiled 2018)',
  source: 'Climate Accountability Institute',
  link: 'https://climateaccountability.org/carbonmajors_dataset2020.html',
}
const CO2ProducerCompanies: Array<{
  id: string
  rank: number
  ownership: 'state' | 'investor'
  country: string
  name: string
  image: StaticImageData
}> = [
  {
    id: 'sa',
    rank: 1,
    country: 'Saudi Arabia',
    ownership: 'state',
    name: 'Saudi Aramco',
    image: saudi,
  },
  {
    id: 'chevron',
    rank: 2,
    country: 'USA',
    ownership: 'investor',
    name: 'Chevron',
    image: chevron,
    
  },
  {
    id: 'exxon',
    rank: 3,
    country: 'USA',
    ownership: 'investor',
    name: 'ExxonMobil',
    image: exxon,
  },
  {
    id: 'gazprom',
    rank: 4,
    country: 'Russia',
    ownership: 'state',
    name: 'Gazprom',
    image: gazprom,
  },
  {
    id: 'bp',
    rank: 5,
    country: 'Britain',
    ownership: 'investor',
    name: 'BP',
    image: bp,
  },
  {
    id: 'shell',
    rank: 6,
    country: 'Netherlands; UK',
    ownership: 'investor',
    name: 'Royal Dutch Shell & BG',
    image: shell,
  },
  {
    id: 'iran',
    rank: 7,
    country: 'Iran',
    ownership: 'state',
    name: 'National Iranian Oil Co',
    image: iranian,
  },
  {
    id: 'coalindia',
    rank: 8,
    country: 'India',
    ownership: 'state',
    name: 'Coal India',
    image: coalIndia,
  },
  {
    id: 'pemex',
    rank: 9,
    country: 'Mexico',
    ownership: 'state',
    name: 'Pemex',
    image: pemex,
  },
  {
    id: 'conoco',
    rank: 10,
    country: 'USA',
    ownership: 'investor',
    name: 'ConocoPhillips',
    image: conoco,
  },
  {
    id: 'peabody',
    rank: 11,
    country: 'USA',
    ownership: 'investor',
    name: 'Peadbody Energy',
    image: peabody,
  },
  {
    id: 'petrocn',
    rank: 12,
    country: 'China',
    ownership: 'state',
    name: 'PetroChina',
    image: petrocn,
  },
  {
    id: 'pdvsa',
    rank: 13,
    country: 'Venezuela',
    ownership: 'state',
    name: 'Petróleos de Venezuela, S.A.',
    image: pdvsa,
  },
  {
    id: 'total',
    rank: 14,
    country: 'France',
    ownership: 'investor',
    name: 'Total Energies',
    image: total,
  },
  {
    id: 'adnoc',
    rank: 15,
    country: 'United Arab Emirates',
    ownership: 'state',
    name: 'Abu Dhabi National Oil Company',
    image: adnoc,
  },
  {
    id: 'kuwait',
    rank: 16,
    country: 'Kuwait',
    ownership: 'state',
    name: 'Kuwait Petroleum Corporation',
    image: kuwait,
  },
  // {
  //   rank: 17,
  //   name: 'Iraq National Oil Co',
  //   image: kuwait
  // },
  {
    id: 'sonatrach',
    rank: 18,
    country: 'Algeria',
    ownership: 'state',
    name: 'sonatrach',
    image: sonatrach,
  },
  {
    id: 'bhp',
    rank: 19,
    country: 'Australia',
    ownership: 'investor',
    name: 'BHP Billiton',
    image: bhpb,
  },
  {
    id: 'consol',
    rank: 20,
    country: 'USA',
    ownership: 'investor',
    name: 'Consol (now CNX)',
    image: consol,
  },
  {
    id: 'patrobras',
    rank: 21,
    country: 'Brazil',
    ownership: 'state',
    name: 'Petrobras',
    image: petrobras,
  },
]

export default CO2ProducerCompanies

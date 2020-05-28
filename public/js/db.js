/**
 * Converts object to JSON.
 */
function convertToJSON () {
  const arr = []
  const db = {}

  const plant = {
    id: '1',
    name: 'Testsak',
    latin: 'Testorus Sakus',
    seasons: 'april - september',
    steps: { cultivate: ['Plantera fröna med ett 12 cm avstånd på 2 cm djup. Täck med jord.', 'Vattna rikligt och låt vattnet rinna av.', 'Täck växten med plast. Gör små lufthål i plasten.'], rePlant: ['Lossna försiktigt krukan. Se till att inga rötter skadas. Lägg 5 cm jord i bottnen på den nya krukan. Innan du sätter ned växten, se till att lucka upp jorden lite.', 'Vattna plantan och ge den en blompinne som stöd.'], plant: ['Du kan nu plantera din växt utomhus. Tillsätt gärna näringsrik jord vid plantering. Kom ihåg att plantera den där det är soligt.'], harvest: ['Din växt är nu redo för att skördas. Knipsa av frukterna med en sekatör.'] },
    alert: [2, 5, 3],
    stepsDone: [0, 0, 0],
    water: [1]
  }

  for (let i = 0; i < 20; i++) {
    arr.push(plant)
  }

  console.log(JSON.stringify(arr))
}

export { convertToJSON }

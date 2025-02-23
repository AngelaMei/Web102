import React from 'react'
import './App.css'
import headerImage from '/headerimage.png';
import  Card  from './components/card'
// import Navigation from './components/Navigation'

function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src="../public/headerimage.png" alt="Header image" />
          <h1>🌵 Natural Wonders around Las Vegas 🏜️</h1>
          <h2>Here are a few spots to explore if you're looking to escape the city buzz and connect with nature</h2>
        </header>
        <div className="card-container">
            <Card 
              title="Red Rock Canyon"
              description="Red Rock Canyon is a 195,819-acre area located in the Mojave Desert. It is known for its stunning red sandstone peaks and walls."
              linkUrl="https://maps.app.goo.gl/Y7JzJ7m7ruin2mgT7"
              rotate="5"
              imageUrl="https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2020/07/1140-hiker-at-zion-national-park.jpg"/>
            <Card
              title="Valley of Fire State Park"
              description="Valley of Fire State Park is Nevada's oldest state park. It covers an area of approximately 46,000 acres and is known for its red sandstone formations."
              linkUrl="https://maps.app.goo.gl/3c4pKjuFArabMDtz5"
              rotate="-5"
              imageUrl="https://travelnevada.com/wp-content/uploads/2014/04/VOF-Michael-Matti-Feat.jpg"/>
            <Card
              title="Mount Charleston"
              description="Mount Charleston is the highest peak in the Spring Mountains. It is a popular destination for Las Vegas residents looking to escape the summer heat."
              linkUrl="https://maps.app.goo.gl/TXUxhk9vVzP3pLaKA"
              rotate="6"
              imageUrl="https://i.redd.it/shorter-4-5-mile-hike-with-an-amazing-payoff-in-the-mount-v0-1lt0tgsm93t81.jpg?width=4032&format=pjpg&auto=webp&s=440020544c97a8294e947017512c282a66c0d7ab"/>
            <Card
              title="Grand Canyon National Park"
              description="Grand Canyon National Park, in Arizona, is home to much of the immense Grand Canyon, with its layered bands of red rock revealing millions of years of geological history."
              linkUrl="https://maps.app.goo.gl/p24Djo9Je9EDbQKQ7"
              rotate="-5"
              imageUrl="https://koa.com/blog/images/sunset-horseshoe-bend-grand-canyon.jpg?preset=heroimagecropped"/>
            <Card
              title="Death Valley"
              description="Death Valley is a national park in California and Nevada, known for its extreme temperatures and low elevation."
              linkUrl="https://maps.app.goo.gl/gt4erifQiSR5SedN9"
              rotate="4"
              imageUrl="https://travelnevada.com/wp-content/uploads/2014/04/Death-Valley-NP-AustinPedersen-Feat.jpg"/>
            <Card
              title="Hoover Dam"
              description="Hoover Dam is a concrete arch-gravity dam on the Colorado River, located on the border between Arizona and Nevada."
              linkUrl="https://maps.app.goo.gl/i78M2BaBW4xx4Ycd6"
              rotate="-1"
              imageUrl="https://res.taketours.com/images/Hoover-Dam-NV.webp"/>
            <Card
              title="Zion National Park"
              description="Zion National Park is a southwest Utah nature preserve distinguished by Zion Canyon’s steep red cliffs."
              linkUrl="https://maps.app.goo.gl/GSQBwVpFZHCPEn2f7"
              rotate="3"
              imageUrl="https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-10/Zion_0.jpg?h=345ab7ac&itok=2eLFqdkx"/>
            <Card
              title="Lake Mead National Recreation Area"
              description="Boating, swimming, fishing, hiking, and the iconic Hoover Dam. A vast and diverse landscape."
              linkUrl="https://maps.app.goo.gl/aFCnqgEAvvz75ePV9"
              rotate="-7"
              imageUrl="https://assets.simpleviewcms.com/simpleview/image/fetch/c_limit,h_1200,q_75,w_1200/https://lasvegas.simpleviewcrm.com/images/listings/original_LakeMead0-70db027dd405681.jpeg"/>
            <Card 
              title="Spring Mountain Ranch State Park"
              description="Historic ranch, hiking trails, and beautiful scenery. A glimpse into Nevada's past and present."
              linkUrl="https://maps.app.goo.gl/2iZ5CXmPQPFk6LHc7"
              rotate="4"
              imageUrl="https://travelnevada.com/wp-content/uploads/2023/08/Spring-Mt-Ranch-Sky-Steve-Wohlwender.jpg"/>
            <Card 
              title="Gold Butte National Monument"
              description="Rugged and remote landscape with unique rock formations, petroglyphs, and wildlife."
              linkUrl="https://maps.app.goo.gl/H6RmT4DncHGXE9Gq5"
              rotate="-2"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a9/Gold_Butte_National_Monument_5.jpg"/>

            <Card 
              title="Upper Antelope Canyon"
              description="Navajo Upper Antelope Canyon is a slot canyon in the American Southwest, on Navajo land east of Lechee, Arizona."
              linkUrl="https://maps.app.goo.gl/gHbDUD8nukYqEKzy8"
              rotate="6"
              imageUrl="https://detoursamericanwest.com/wp-content/uploads/2023/03/Antelope-Canyon-Tours-from-Phoenix-DETOURS-LP.jpg"/>

            <Card 
              title="Monument Valley"
              description="Monument Valley is close to Lake Powell and the East Rim of Grand Canyon National Park."
              linkUrl="https://maps.app.goo.gl/dAKAr6uxngzBje5UA"
              rotate="-4"
              imageUrl="https://grandcanyon.com/wp-content/uploads/2024/05/monument-valley-arizona.jpg"/>
        </div>
      </div>
    </>
  )
}

export default App

# Project 3: Dungeon Delver


## Table of Contents:
* [Code](#code)
* [Demo](#demo)
* [Authors](#authors)
* [Features](#features)
* [Tech](#tech)
* [Screenshots](#screenshots)
* [Roadmap](#roadmap)

## Code

GitHub Link: https://github.com/the-wake/dungeon-delver

## Demo

Project Live Link: https://ancient-ocean-23622.herokuapp.com/

Generic login
    Email: test@test.com
    Password: testtest1

## Authors

- [@AlexHuss](https://github.com/Huss33)
- [@NickMullenmeister](https://github.com/Mully7773)
- [@BenMartin](https://github.com/the-wake/)
- [@LeoDickens](https://github.com/LeoDickenson)

## Features

- Allows DM(Dungeon Master) to create multiple Dungeons and Dragons campaigns and choose which to have active or not

- Inside each campaign, the DM can create multiple dungeons which can also be set to active or inactive

- Inside each dungeon, the DM can create multile rooms. In each room, the DM will determine if it is active or not as well as give the room a unique blurb(an intro to the room that reveals the overall setting of the room)

- The DM can also create multiple creatures(foes) and add them to individual rooms. The DM will determine the name, hp(hit points), loot, any key NPC's, if the creature is alive/active

- The DM can edit any campaign, dungeon, room or creature

- The DM can remove any dungeon, room or creature

## Tech

- Mongoose, Apollo Server Express, Bcrypt, Express, GraphQL, Jsonwebtoken, Bootstrap, JWT Decode, React, React Bootstrap, React Dom, React Router Dom, React Scripts, CSS, JavaScript and Node/Nodemon


## Screenshots

![App Screenshot](https://github.com/the-wake/dungeon-delver/blob/main/client/public/assets/images/ScreenShot1.JPG) 

![App Screenshot](https://github.com/the-wake/dungeon-delver/blob/main/client/public/assets/images/ScreenShot2.JPG) 

## Roadmap

- Improve UI/UX.
- Get page to re-render contents when a new item is posted.
- When creating a campaign, go directly into that campaign.
- Add active/inactive toggle to all edit forms.
- Store the SessionContext in cache, and reload it when user logs back in.
    Could also store their last-accessed page this way and redirect after login
    (or just if logged out by token expiration).
- Add third party API intergration with Open5e to generate HP for creatures.
- Add toggles to the components that displays lists.
    Toggle showing only active items, only inactive items, or all items
    Show only items in the currently focused parent, or show all of them in the 
    current campaign.
- Add GraphQL virtuals.
- Add up-a-level links.
- Error boundaries for handling different errors 
    (like when user needs to login to reach a page).
 
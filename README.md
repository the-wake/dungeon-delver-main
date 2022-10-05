# Dungeon Delver

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to Dungeon Delver — a companion app for Dungeon Masters of all shapes and sizes!

![App Screenshot](https://raw.githubusercontent.com/the-wake/dungeon-delver/main/client/public/assets/images/ScreenShot1.JPG)
## Table of Contents:
- [Dungeon Delver](#dungeon-delver)
  - [Table of Contents:](#table-of-contents)
  - [Code](#code)
  - [Demo](#demo)
  - [Authors](#authors)
  - [Features](#features)
  - [Tech](#tech)
  - [Roadmap](#roadmap)

## Code

GitHub Link: https://github.com/the-wake/dungeon-delver-main

## Demo

Project Live Link: https://dungeon-delver-main.herokuapp.com/

Generic login
    Email: test@test.com
    Password: testtest1

## Authors

- [@AlexHuss](https://github.com/Huss33)
- [@NickMullenmeister](https://github.com/Mully7773)
- [@BenMartin](https://github.com/the-wake/)
- [@LeoDickens](https://github.com/LeoDickenson)

## Features

- Allows DMs (Dungeon Masters) to create multiple Dungeons & Dragons campaigns and choose which to have active or not

- Inside each campaign, the DM can create multiple dungeons which can also be set to active or inactive

- Inside each dungeon, the DM can create multile rooms. In each room, the DM will determine if it is active or not as well as give the room a unique blurb(an intro to the room that reveals the overall setting of the room)

- The DM can also create multiple creatures(foes) and add them to individual rooms. The DM will determine the name, hp(hit points), loot, any key NPC's, if the creature is alive/active

- The DM can edit any campaign, dungeon, room or creature

- The DM can remove any dungeon, room or creature

## Tech

- Mongoose, Apollo Server Express, Bcrypt, Express, GraphQL, Jsonwebtoken, Bootstrap, JWT Decode, React, React Bootstrap, React Dom, React Router Dom, React Scripts, CSS, JavaScript and Node/Nodemon

## Roadmap

- Improve UI/UX.
- More robust state management.
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
- Error boundaries for handling different errors 
    (like when user needs to login to reach a page).
 
import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
    query getCampaigns($name: String!) {
        campaigns(name: $name) {
            name
            is_active
        }
    }`;

export const QUERY_DUNGEONS = gql`
    query getDungeons($name: String!) {
        dungeons(name: $name) {
            name
            is_active
            campaigns {
                name
            }
        }
    }`;

export const QUERY_ROOMS = gql`
    query getRooms($name: String!) {
        rooms(name: $name) {
            name
            blurb
            is_active
            dungeon {
                name
                campaigns {
                    name
                }
            }
        }
    }`;

export const QUERY_CREATURES = gql`
    query getCreatures($name: String!) {
        creatures(name: $name) {
            hp
            loot
            key_npc
            is_alive
            is_active
            rooms {
                name
                dungeons {
                    name
                    campaigns {
                        name
                    }
                }
            }
        }
    }`
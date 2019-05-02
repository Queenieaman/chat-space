# README

<!--
search for ruby version :
...
ruby --version
...
 in Terminal -->

## What is ChatSpace

This is a chat application including the following functions:

- new registration system
- multi chat with several people in groups
- search chat members
- invite users to chat groups
- check chat historical
- send images to chat space
- automatically update in chat space

![Sample ChatSpace](https://chat-space-proto.herokuapp.com/)

## Design DB Scheme

>## Table: 'messages'

### To save chat messages

|Column  |Type    |Options                       |
|:------:|:------:|------------------------------|
|body    |string  | -                            |
|image   |string  | -                            |

### Associations

- belongs_to :group
- belongs_to :user

>## Table: 'user'

To save users information

|Column    |Type    |Options                              |
|:--------:|:------:|-------------------------------------|
|nickname  |string  |null: false, unique: true, add_index |
|email     |string  |null: false,                         |

### Associations

- has_many :messages
- has_many :group_members
- has_many :groups, through: :group_members

>## Table: 'groups'

### To save groups

|Column  |Type    |Options                       |
|:------:|:------:|------------------------------|
|name    |string  |null: false, add_index        |

### **Associations**

- has_many :messages
- has_many :groups_members
- has_many :users, through: :group members

>## Table: 'group_members'

### To save members of groups

|Column  |Type       |Options                       |
|:------:|:---------:|------------------------------|
|user_id |references |null: false, foreign_key: true|
|group_id|references |null: false, foreign_key: true|

### Associations

- belong_to user
- belong_to group

*These Association will be created automatically on _group_members.rb_ according to _references_ type.

## Development Environment

- Ruby 2.5.1  
- Rails 5.0.7.2


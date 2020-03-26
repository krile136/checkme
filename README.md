# README
## test

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false|

### Association
- has_many :sheets, through: :user_sheets, dependent: :destroy
- has_many :user_sheets, dependent: :destroy
- has_many :cooperate_requests, dependent: :destroy

---
## sheetsテーブル

|Column|Type|Options|
|------|----|-------|
|title|string||
|is_public|boolean|null: false, default: false|
|is_cooperate|boolean|null: false, default: false|
|is_secret|boolean|null: false, default: false|
|is_pulled|boolean|null: false, default: false|
|pulling_number|integer||
|last_view|timestamp||
|author|string||

### Association
- has_many :user_sheets, dependent: :destroy
- has_many :users, through: :user_sheets
- has_many :items, dependent: :destroy
- accepts_nested_attributes_for :items, allow_destroy: true
- has_many :cooperate_requests, dependent: :destroy

---
## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|is_check|boolean|null: false, default: false|
|sheet_id|integer|null: false|
|is_head|boolean|null: false, default: false|
|top|integer|null: false|

### Association
- belongs_to :sheet

---

## cooperate_requestsテーブル

|Column|Type|Options|
|------|----|-------|
|request_id|integer|null: false|
|sheet_id|integer|null: false|
|user_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :sheet

---

## user_sheetsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|sheet_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :sheet
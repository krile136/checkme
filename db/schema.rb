# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_19_135319) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cooperate_requests", force: :cascade do |t|
    t.integer "request_id", null: false
    t.bigint "sheet_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sheet_id"], name: "index_cooperate_requests_on_sheet_id"
    t.index ["user_id"], name: "index_cooperate_requests_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.boolean "is_check", default: false, null: false
    t.bigint "sheet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_head", default: false, null: false
    t.integer "top", null: false
    t.index ["sheet_id"], name: "index_items_on_sheet_id"
  end

  create_table "sheets", force: :cascade do |t|
    t.string "title"
    t.boolean "is_public", default: false, null: false
    t.boolean "is_cooperate", default: false, null: false
    t.boolean "is_secret", default: false, null: false
    t.boolean "is_pulled", default: false, null: false
    t.integer "pulling_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_view"
    t.string "author"
  end

  create_table "user_sheets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "sheet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sheet_id"], name: "index_user_sheets_on_sheet_id"
    t.index ["user_id"], name: "index_user_sheets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.boolean "show_howto", default: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "cooperate_requests", "sheets"
  add_foreign_key "cooperate_requests", "users"
  add_foreign_key "items", "sheets"
  add_foreign_key "user_sheets", "sheets"
  add_foreign_key "user_sheets", "users"
end

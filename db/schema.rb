# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_16_135517) do

  create_table "projects", primary_key: "project_id", id: :string, force: :cascade do |t|
    t.string "project_name"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "work_schedule_pres", force: :cascade do |t|
    t.string "user_id"
    t.string "project_id"
    t.string "work_knd"
    t.float "schedule_work_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "work_schedule_results", force: :cascade do |t|
    t.string "user_id"
    t.string "project_id"
    t.string "work_knd"
    t.string "work_status"
    t.float "work_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "workingDay"
  end

  create_table "works", force: :cascade do |t|
    t.string "work_content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "project_id"
  end

  add_foreign_key "works", "projects", primary_key: "project_id"
end

class CreateSheets < ActiveRecord::Migration[5.2]
  def change
    create_table :sheets do |t|
      t.string :title
      t.boolean :is_public
      t.boolean :is_cooperate
      t.boolean :is_secret
      t.boolean :is_pulled
      t.string :pulling_number
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end

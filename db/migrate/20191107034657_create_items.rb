class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.boolean :is_check
      t.references :sheet, null: false, foreign_key: true
      t.timestamps
    end
  end
end

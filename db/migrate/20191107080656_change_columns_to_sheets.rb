class ChangeColumnsToSheets < ActiveRecord::Migration[5.2]
  def change
    change_column :sheets, :pulling_number, 'integer USING CAST(pulling_number AS integer)'
  end
end

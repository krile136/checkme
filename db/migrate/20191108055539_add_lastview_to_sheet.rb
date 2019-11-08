class AddLastviewToSheet < ActiveRecord::Migration[5.2]
  def change
    add_column :sheets, :last_view, :datetime
  end
end

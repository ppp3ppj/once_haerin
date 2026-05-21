class CreateHaerins < ActiveRecord::Migration[8.1]
  def change
    create_table :haerins do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end

class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :board, array: true
      t.integer :deck, array: true
      t.string :room, unique: true
      t.boolean :started, default: false
      t.timestamps
    end
  end
end

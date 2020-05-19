class AddStatusToPlayer < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :status, :string
  end
end

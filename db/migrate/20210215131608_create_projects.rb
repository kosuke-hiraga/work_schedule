class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects, id: false  do |t|


      t.string :project_id, primary_key: true
      t.string :project_name
      t.string :status


      t.timestamps
    end
  end
end

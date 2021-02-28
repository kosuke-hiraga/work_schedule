class CreateWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :works do |t|

    	t.string :project_id
    	t.string :work_content



      t.timestamps
    end
  end
end

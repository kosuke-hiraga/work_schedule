class AddWorkDate < ActiveRecord::Migration[6.0]
  def change
  	    add_column :work_schedule_results, :workingDay, :date
  end
end

class AddColumnWorkScheduleResults < ActiveRecord::Migration[6.0]
  def change
  	add_column :work_schedule_results, :project_seq, :string
  	add_column :work_schedule_results, :work_id, :string
  end
end

class CreateWorkScheduleResults < ActiveRecord::Migration[6.0]
  def change
    create_table :work_schedule_results do |t|

    	t.string  :user_id
    	t.string  :project_id
    	t.string  :work_knd

    	t.string  :work_status
    	t.float   :work_time


      t.timestamps
    end
  end
end

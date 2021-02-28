class CreateWorkSchedulePres < ActiveRecord::Migration[6.0]
  def change
    create_table :work_schedule_pres do |t|

    	t.string    :user_id
    	t.string    :project_id
    	t.string    :work_knd
    	t.float     :schedule_work_time

      t.timestamps
    end
  end
end

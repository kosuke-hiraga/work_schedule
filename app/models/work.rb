class Work < ApplicationRecord
	# has_many :work_schedule_results, dependent: :destroy
	has_many :work_schedule_results
end

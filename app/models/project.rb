class Project < ApplicationRecord

		enum status: {
			not_started:  0, #test
			now_on_work:  1, # 作業中
			done:         2 # 終了
			# _prefix: true
		}
end

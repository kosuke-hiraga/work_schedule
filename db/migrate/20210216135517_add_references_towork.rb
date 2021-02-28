class AddReferencesTowork < ActiveRecord::Migration[6.0]

  # def change
  # 	# remove_column  :works, :project_id, :string
  # 	add_reference  :works, :projects, foreign_key: true
  # 	change_column  :works, :project_id, :string, null: false
  # 	# puts 'change'
  # end


	def up
		# remove_column  :works, :project_id, :string
		# change_column   :projects, :project_id, 
		add_column      :works, :project_id, :string
		add_foreign_key :works, :projects, column: :project_id, primary_key: "project_id"
		# add_reference  :works, :projects, foreign_key: true
  	# change_column  :works, :project_id, :string, null: false
  	# puts 'up'
  end


  def down
  	# add_column  	    :works, :project_id, :string
  	remove_reference  :works, :projects, foreign_key: true
  	# change_column     :works, :projects_id, :integer, null: false
  end


end

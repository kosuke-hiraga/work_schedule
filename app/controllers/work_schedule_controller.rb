class WorkScheduleController < ApplicationController



	def show
  
		# @pre_work = Work_shedule_pre.find_by(user_id: '1')
		# @pre_work = WorkSchedulePre.where('user_id = ?', ["1","2"])
    
		# @pre_work = WorkSchedulePre.where(user_id:  ["1","2"]) #〇シンボル型
    @worked_list = WorkScheduleResult.where('user_id IN (?)', ["1","2"]).group(:work_knd).sum(:work_time) #〇プレースホルダー型
    @work = Work.all
    # @works_list = Works.where('project_id IN (?)', ["100","2"]) #〇プレースホルダー型

		# @pre_work = WorkSchedulePre.where('user_id = ?', [1])
    currentDate = DateTime.now.strftime('%F')#
    @droped_tasks = WorkScheduleResult.where('user_id = ?', "2")
                                      .where('workingDay = ?', currentDate) #〇プレースホルダー型

  end




  def create

    worked_list = WorkScheduleResult.where('user_id = ?', "2")
                                    .where('workingDay = ?', params[:workingDate]).destroy_all #〇プレースホルダー型
    # worked_list.destroy

    puts "Check parms///"
    # puts  params
    puts  params[:project_id]
    puts  params[:project_id].length 

  	# work_result[:user_id] = '1'
   #  work_result[:work_knd] = params[:procces]

  	# # work_result[:project_id] = params[:PJno]
  	# # work_result[:work_time] = params[:work_time]

   #  work_result[:project_id] = params[:task]
  	# work_result.save

    params[:project_id].each_with_index do |variable, i|

      work_result = WorkScheduleResult.new
      
      work_result[:user_id] = '2'
      work_result[:work_knd] = params[:SystemProcess][i]
      work_result[:workingDay] = params[:workingDate]

      # work_result[:project_id] = params[:PJno]
      # work_result[:work_time] = params[:work_time]

      work_result[:project_id] = params[:project_id][i]
      work_result[:work_time] = params[:work_time][i]
      work_result.save
      puts "★succuces save" + i.to_s + "times"
    end


  	# render '/work_schedule'
  	redirect_to '/work_schedule'
  end

  # def destroy
  #   puts "destroy"

  # end



  def getList
    puts 'Yes Bs'
    puts params[:id]

    # @worked_list = WorkScheduleResult.where('user_id IN (?)', ["1","2"]).group(:work_knd).sum(:work_time) #〇プレースホルダー型
    @work = Work.where('project_id = ?', params[:id])

    # return '通信成功　やったね'
    jsonX = {'test' => 'PPP'}
    # render :json => jsonX
    render :json => @work
    
  end
end

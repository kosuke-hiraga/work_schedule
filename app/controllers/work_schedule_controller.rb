class WorkScheduleController < ApplicationController



	def show
  
		# @pre_work = Work_shedule_pre.find_by(user_id: '1')
		# @pre_work = WorkSchedulePre.where('user_id = ?', ["1","2"])
    
		# @pre_work = WorkSchedulePre.where(user_id:  ["1","2"]) #〇シンボル型


    @worked_list = WorkScheduleResult.where('user_id IN (?)', ["1","2"])
                                     .group(:work_knd)
                                     .sum(:work_time) #〇プレースホルダー型
    
    #そのうち、関係者のみプロジェクトを取得するように修正する
    # @project = Project.all
    # @project = Project.where('project_id IN (?)', ["101","102", "103","104"])
    @project = Project.all.limit(5)


    #ページネイションを自力で実装する (端数は切り上げする)
    #@project = Project.paginate(page: params[:page], per_page: 5);
    @page = (@project.count / 2.to_f).ceil




    # @works_list = Works.where('project_id IN (?)', ["100","2"]) #〇プレースホルダー型

		# @pre_work = WorkSchedulePre.where('user_id = ?', [1])
    
    # @droped_tasks = WorkScheduleResult.where('user_id = ?', "2")
    #                                   .where('workingDay = ?', currentDate) #〇プレースホルダー型

    currentDate = DateTime.now.strftime('%F')
    @droped_tasks = WorkScheduleResult.joins("JOIN Works 
                                              ON  work_schedule_results.project_id = works.project_id 
                                              AND work_schedule_results.work_id    = works.id")
                                      .where('user_id = ?', "2")
                                      .where('workingDay = ?', currentDate)

  end




  def create
    #Delete & writeで保存処理をかける
    WorkScheduleResult.where('user_id = ?', "2")
                      .where('workingDay = ?', params[:workingDate]).destroy_all #〇プレースホルダー型
    # worked_list.destroy

    puts "Check parms///"
    # puts  params
    # puts  params[:project_id]
    # puts  params[:project_id].length

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


      #「100-1-clones●seq1」の形式に対して、下記の様に分割し保存する
      # :project_id　 「100」
      # :work_id　　  「1」
      # :project_seq　「clones●seq1」
      work_result[:project_id]  = params[:project_id][i].split('-')[0]
      work_result[:work_id]     = params[:project_id][i].split('-')[1]
      work_result[:project_seq] = params[:project_id][i].split('-')[2]

      # work_result[:project_id] = params[:project_id][i]
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
    # @worked_list = WorkScheduleResult.where('user_id IN (?)', ["1","2"]).group(:work_knd).sum(:work_time) #〇プレースホルダー型
    @work = Work.where('project_id = ?', params[:id])

    # return '通信成功　やったね'
    jsonX = {'test' => 'PPP'}
    # render :json => jsonX
    render :json => @work
  end


#クリックしたページ番号から5件情報を取得する
  def getProject
    #ページ番号1をクリックした場合、offset値が0になるので1番目のデータから5件分取得
    #ページ番号2をクリックした場合、offset値が5になるので6番目のデータから5件分取得
    offsetNumber = params[:id].to_i * 5 - 5
    @project = Project.all.order(:project_id).limit(5).offset(offsetNumber)

    render :json => @project
  end


end

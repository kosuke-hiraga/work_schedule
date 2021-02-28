module SessionHelper

		def login(info)

		# session[:name] = params[:name]
  # 	session[:password] = params[:password]

  	session[:name] = info[:name]
  	session[:password] = info[:password]



  	session[:password] = 'kosuke'
		end
end

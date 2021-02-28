module LoginHelper

	def login2(login_infomation)
		# session[:name] = name
	  session[:name] = login_infomation.name
      session[:password] = login_infomation.password

	end
end

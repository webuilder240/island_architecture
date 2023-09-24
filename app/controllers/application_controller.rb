class ApplicationController < ActionController::Base
  before_action :turbo_frame_request
  
  def turbo_frame_request
    if request.headers["Turbo-Frame"]
      render layout: false
    end
  end
end

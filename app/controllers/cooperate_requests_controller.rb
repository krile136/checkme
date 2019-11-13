class CooperateRequestsController < ApplicationController
  def create

    request_params['request_id'].each do |id|
      cooperate_request = CooperateRequest.new
      cooperate_request.sheet_id = request_params[:sheet_id]
      cooperate_request.user_id = request_params[:user_id]
      cooperate_request.request_id = id
      cooperate_request.save
    end
  end

  private

  def request_params
    params.permit(:sheet_id, request_id: []).merge(user_id: current_user.id)
  end
end

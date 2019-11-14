class CooperateRequestsController < ApplicationController
  def create
    request_params['request_id'].each do |id|
      cooperate_request = CooperateRequest.new
      cooperate_request.sheet_id = request_params[:sheet_id]
      cooperate_request.user_id = request_params[:user_id]
      cooperate_request.request_id = id
      cooperate_request.save
    end
    @added_requests = CooperateRequest.where(sheet_id: request_params[:sheet_id]).where(user_id: request_params[:user_id])
    render json: @added_requests
  end

  def destroy
    request = CooperateRequest.find(params[:id])
    @destroy_requests = CooperateRequest.where(sheet_id: request.sheet_id).where(user_id: request.user_id)
    @destroy_requests.each do |destroy_request|
      destroy_request.destroy
    end
    render json: @destroy_requests
  end

  def reject
    request = CooperateRequest.find(params[:id])
    request.destroy
    redirect_to user_path(current_user)
  end

  private

  def request_params
    params.permit(:sheet_id, request_id: []).merge(user_id: current_user.id)
  end
end

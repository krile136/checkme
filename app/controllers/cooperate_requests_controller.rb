class CooperateRequestsController < ApplicationController
  before_action :move_to_index, except: :index

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

  def accept
    request = CooperateRequest.find(params[:id])

    # 保存用のデータをparamsにmergeしておく
    merged_params = params.merge(user_id: current_user.id).merge(sheet_id: request.sheet.id).merge(is_cooperate: 'true')

    # 中間テーブル保存用のインスタンスを生成
    accept_params = merged_params.permit(:user_id, :sheet_id)
    user_sheet = UserSheet.new(accept_params)

    # sheetテーブルのis_cooperateをtrueにするインスタンスを生成
    accept_sheet = Sheet.find(request.sheet.id)
    coop_params = merged_params.permit(:is_cooperate)

    # 対象のリクエストを削除
    request.destroy

    # 中間テーブルを保存
    user_sheet.save

    # sheetテーブルのis_cooperateをtrueにする
    accept_sheet.save(coop_params)
    accept_sheet.update(coop_params)
    
    redirect_to user_path(current_user)
  end

  private
  def move_to_index
    redirect_to root_path unless user_signed_in?
  end

  def request_params
    params.permit(:sheet_id, request_id: []).merge(user_id: current_user.id)
  end

  def user_sheet_params
    params.permit(:authenticity_token).merge(user_id: current_user.id);
  end
end

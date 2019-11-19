Rails.application.routes.draw do
  devise_for :users
  root 'sheets#index'

  resources :users, only: [:index, :show, :edit, :update] do
    collection do
      get :how_to_use
    end
  end

  resources :sheets, only: [:index, :new, :create, :edit, :update, :destroy, :show] do
    member do
      patch :update_date
      patch :set_public
      patch :cancel_public
      post :pull
    end
    collection do
      get :get_check
    end
  end

  resources :items, only: [:update, :show]

  resources :cooperate_requests, only: [:create, :destroy] do
    member do
      delete :reject
      patch :accept
    end
  end

  namespace :api do
    resources :sheets, only: :index, defaults: { format: 'json' } do
      collection do
        get :mypage
        get :public
      end
    end
    resources :users, only: [:index, :update], defaults: { format: 'json' }
  end
  
end

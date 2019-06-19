class UsersController < ApplicationController
  def index
    @users = User.where('name LIKE(?)', "#{params[:keyword]}%").where.not(id:member_users) 
    
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
    end

    def member_users
      member_users = []
      member_users << current_user.id
      if params[:group_users]
        params[:group_users].map do |user_id|
        member_users << user_id.to_i
        
      end
    
    end

    return member_users
    end


  private

  def user_params
    params.require(:user).permit(:name, :emall)
  end

  
end




# @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
# @users = User.where('name LIKE(?)', "%#{params[:name]}%").where.not(id:current_user.id)
class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit  # editアクションのviewを表示
    end
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      flash.now[:alert] = "グループ名を入力してください"
      render :new
    end
  end

  def index
    #paramsとして送られてきたkeyword（入力された語句）で、Userモデルのnameカラムを検索し、その結果を@usersに代入する
    @users = User.where('name LIKE(?)', "%#{params[:name]}%").where.not(id:current_user.id) #idがcurrent_user.id以外のユーザーを全て取得
    respond_to do |format| 
      format.html
      format.json
    end
  end
  
  def user_params
    params.require(:user).permit(:name, :email)
  end

end

# The former(require) is used to mark parameters as required. The latter(permit) is used to set the parameter as permitted and limit which attributes should be allowed for mass updating.

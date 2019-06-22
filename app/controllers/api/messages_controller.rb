class Api::MessagesController < ApplicationController
  def index

    @group = Group.find(params[:group_id])
    
    respond_to do |format|
      format.html
      format.json { @messages = Message.where('id > ? and group_id = ? ', params[:id], @group.id) }   
    end
  end
end
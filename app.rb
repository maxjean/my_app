require 'rubygems'
require 'sinatra'
require 'em-websocket'
require 'thin'
require 'json'

EM.run do
  class App < Sinatra::Base
    before do
      headers 'Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
    end

    enable :sessions
    #register Sinatra::Flash
    set :protection, false
    #set :views, settings.root + "/views"
    #set :root, 'lib/app'
    @clients = [];

    #start websocket server inlcuding EventMachine
    EM::WebSocket.start(:host => '0.0.0.0', :port => '4247') do |ws| #we fixe our websocket connection and instanciate it with "ws"
      ws.onopen do |handshake|  #Event=open, occurs when socket connection is established
        puts "WS OPEN"
        @clients.push(ws)
      end

      ws.onclose do   #Event=close, occurs when socket connection is closed
        puts "WS CLOSED"
        ws.send "Closed."
      end

      ws.onmessage do |msg| #Event=message, occurs when client receives data from server
        puts "message sending...: #{ws}"
        @clients.map do |c|
          puts "Received Message: #{msg}"
          c.send msg
        end
      end
    end

    get '/' do
      render :html, :index
    end

    get '/sectionsDatas' do
      content_type :json
      datas = [
          {
              :id => 1,
              :name => 'À rencontrer',
              :items => [
                  {
                      :id => 1,
                      :name => 'Steve Jobs'
                  },
                  {
                      :id => 2,
                      :name => 'James David'
                  },
                  {
                      :id => 3,
                      :name => 'Marc Ludovic '
                  },
                  {
                      :id => 4,
                      :name => 'John Newton'
                  }
              ]
          },
          {
              :id => 2,
              :name => 'Entretien',
              :items => []
          }
      ].to_json
    end

  end

  # run! if __FILE__ == $0
  App.run! :port => 4246, :bind => '0.0.0.0'
end

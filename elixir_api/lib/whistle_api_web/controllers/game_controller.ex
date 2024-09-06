defmodule WhistleApiWeb.GameController do
  use WhistleApiWeb, :controller

  alias WhistleApi.Games
  alias WhistleApi.Tournaments.Game

  action_fallback WhistleApiWeb.FallbackController

  def create(conn, %{"game" => game_params}) do
    with {:ok, %Game{} = game} <- Games.create_game(game_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/games/#{game}")
      |> render(:show, game: game)
    end
  end

  def show(conn, %{"id" => id}) do
    game = Games.get_game!(id)
    render(conn, :show, game: game)
  end

  def update(conn, %{"id" => id, "game" => game_params}) do
    game = Tournaments.get_game!(id)

    with {:ok, %Game{} = game} <- Tournaments.update_game(game, game_params) do
      render(conn, :show, game: game)
    end
  end

  def delete(conn, %{"id" => id}) do
    game = Tournaments.get_game!(id)

    with {:ok, %Game{}} <- Tournaments.delete_game(game) do
      send_resp(conn, :no_content, "")
    end
  end
end

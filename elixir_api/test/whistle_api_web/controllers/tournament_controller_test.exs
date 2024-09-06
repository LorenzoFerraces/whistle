defmodule WhistleApiWeb.TournamentControllerTest do
  use WhistleApiWeb.ConnCase

  import WhistleApi.TournamentsFixtures

  alias WhistleApi.Tournaments.Tournament

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tournaments", %{conn: conn} do
      conn = get(conn, ~p"/api/tournaments")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create tournament" do
    test "renders tournament when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/tournaments", tournament: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/tournaments/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/tournaments", tournament: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update tournament" do
    setup [:create_tournament]

    test "renders tournament when data is valid", %{conn: conn, tournament: %Tournament{id: id} = tournament} do
      conn = put(conn, ~p"/api/tournaments/#{tournament}", tournament: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/tournaments/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, tournament: tournament} do
      conn = put(conn, ~p"/api/tournaments/#{tournament}", tournament: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete tournament" do
    setup [:create_tournament]

    test "deletes chosen tournament", %{conn: conn, tournament: tournament} do
      conn = delete(conn, ~p"/api/tournaments/#{tournament}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/tournaments/#{tournament}")
      end
    end
  end

  defp create_tournament(_) do
    tournament = tournament_fixture()
    %{tournament: tournament}
  end
end

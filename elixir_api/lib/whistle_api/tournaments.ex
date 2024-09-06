defmodule WhistleApi.Tournaments do
  @moduledoc """
  The Tournaments context.
  """

  import Ecto.Query, warn: false
  alias WhistleApi.Repo

  alias WhistleApi.Tournaments.Tournament

  @doc """
  Returns the list of tournaments.

  ## Examples

      iex> list_tournaments()
      [%Tournament{}, ...]

  """
  def list_tournaments do
    Repo.all(Tournament)
  end

  @doc """
  Gets a single tournament.

  Raises if the Tournament does not exist.

  ## Examples

      iex> get_tournament!(123)
      %Tournament{}

  """
  def get_tournament!(id), do: Repo.get!(Tournament, id)

  @doc """
  Gets all tournaments for a given user_id.

  Raises if the user does not exist.

  ## Examples

      iex> get_tournament_by_user!(123)
      [%Tournament{}, ...]

  """
  def get_tournament_by_user!(user_id), do: Repo.get_by!(Tournament, user_id: user_id)

  @doc """
  searches all tournaments a given sport, location and name

  ## Examples

    iex> search_tournaments("football", "Buenos Aires", "LPF")
    [%Tournament{}, ...]
  """
  def search_tournaments(sport \\ nil, location \\ nil, name \\ nil) do
    query = from(t in Tournament, where: t.privacy == false)

    query =
      if sport && sport != "" do
        from(t in query, where: t.sport == ^sport)
      else
        query
      end

    query =
      if location && location != "" do
        from(t in query, where: t.location == ^location)
      else
        query
      end

    query =
      if name && name != "" do
        from(t in query, where: t.name == ^name)
      else
        query
      end

    Repo.all(query)
  end

  @doc """
  Creates a tournament.

  ## Examples

      iex> create_tournament(%{field: value})
      {:ok, %Tournament{}}

      iex> create_tournament(%{field: bad_value})
      {:error, ...}

  """
  def create_tournament(attrs \\ %{}) do
    %Tournament{}
    |> Tournament.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a tournament.

  ## Examples

      iex> update_tournament(tournament, %{field: new_value})
      {:ok, %Tournament{}}

      iex> update_tournament(tournament, %{field: bad_value})
      {:error, ...}

  """
  def update_tournament(%Tournament{} = tournament, attrs) do
    tournament
    |> Tournament.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Closes a Tournament.

  ## Examples

      iex> close_tournament(tournament_id, user_id)
      {:ok, %Tournament{}}

      iex> close_tournament(tournament_id, user_id)
      {:error, ...}

  """
  def close_tournament(tournament_id, user_id) do
    tournament = get_tournament!(tournament_id)

    if tournament.user_id == user_id do
      tournament
      |> Tournament.changeset(%{closed: true})
      |> Repo.update()
    else
      {:error, "You are not authorized to close this tournament"}
    end
  end

  @doc """
  Deletes a Tournament.

  ## Examples

      iex> delete_tournament(tournament)
      {:ok, %Tournament{}}

      iex> delete_tournament(tournament)
      {:error, ...}

  """
  def delete_tournament(%Tournament{} = tournament) do
    Repo.delete(tournament)
  end

  @doc """
  Returns a data structure for tracking tournament changes.

  ## Examples

      iex> change_tournament(tournament)
      %Todo{...}

  """
  def change_tournament(%Tournament{} = tournament, attrs \\ %{}) do
    tournament
    |> Tournament.changeset(attrs)
  end
end

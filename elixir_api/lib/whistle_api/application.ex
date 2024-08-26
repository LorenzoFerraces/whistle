defmodule WhistleApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WhistleApiWeb.Telemetry,
      WhistleApi.Repo,
      {DNSCluster, query: Application.get_env(:whistle_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: WhistleApi.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: WhistleApi.Finch},
      # Start a worker by calling: WhistleApi.Worker.start_link(arg)
      # {WhistleApi.Worker, arg},
      # Start to serve requests, typically the last entry
      WhistleApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: WhistleApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    WhistleApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
